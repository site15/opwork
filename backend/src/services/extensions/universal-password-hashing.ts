import { Prisma } from '../../generated/prisma/client';
import { hashPassword } from '../../utils/hashPassword';

const SKIP_UNIVERSAL_PASSWORD_HASHING = Symbol('skipUniversalPasswordHashing');
const PASSWORD_MASK = '********';

export const universalPasswordHashingExtension = Prisma.defineExtension(
  (client) => {
    return client.$extends({
      name: 'universal-password-hashing',
      client: {
        get $withoutUniversalPasswordHashing() {
          return client.$extends({
            query: {
              $allModels: {
                $allOperations({ args, query }) {
                  return query({
                    ...args,
                    [SKIP_UNIVERSAL_PASSWORD_HASHING]: true,
                  } as unknown as typeof args);
                },
              },
            },
          });
        },
      },
      query: {
        $allModels: {
          async $allOperations({ operation, args, query }) {
            const shouldSkip = (args as any)[SKIP_UNIVERSAL_PASSWORD_HASHING];
            if (
              !shouldSkip &&
              ['create', 'update', 'upsert', 'createMany'].includes(operation)
            ) {
              const process = (obj: any) => {
                if (obj?.password && typeof obj.password === 'string') {
                  if (obj.password === PASSWORD_MASK) {
                    delete obj.password;
                  } else {
                    obj.password = hashPassword(obj.password);
                  }
                }
              };
              if (operation === 'upsert') {
                process(args.create);
                process(args.update);
              } else {
                if ('data' in args) {
                  if (Array.isArray(args.data)) {
                    args.data.forEach(process);
                  } else {
                    process(args.data);
                  }
                }
              }
            }
            if (args) {
              delete (args as any)[SKIP_UNIVERSAL_PASSWORD_HASHING];
            }
            const result = await query(args);
            if (!shouldSkip && result) {
              const mask = (obj: any) => {
                if (obj && typeof obj !== 'object' && Array.isArray(obj)) {
                  return obj.forEach(mask);
                }
                if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
                  Object.keys(obj).forEach((key) => {
                    if (key === 'password') {
                      obj[key] = PASSWORD_MASK;
                    } else {
                      obj[key] = mask(obj[key]);
                    }
                  });
                }
                return obj;
              };
              return mask(result);
            }
            return result;
          },
        },
      },
    });
  },
);

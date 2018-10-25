import { GraphQLString } from 'graphql';
import { UserType } from '../types/user.type';

export const UserQuery = security => ({
  type: UserType,
  args: {
    id: { type: GraphQLString },
  },
  resolve: (root, args, { headers, loaders }) => {
    return security.ensureAuthenticatedAdmin(headers).then(async authData => {
      return loaders.user.load(args.id);
    }, security.onRejectedAuthentication);
  },
});

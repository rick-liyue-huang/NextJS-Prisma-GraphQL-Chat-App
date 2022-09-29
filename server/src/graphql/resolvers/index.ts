import _ from 'lodash';
import { userResolvers } from './user';

export const resolvers = _.merge({}, userResolvers);

import _ from 'lodash';
import { userResolvers } from './user';

// using lodash to merge the object
export const resolvers = _.merge({}, userResolvers);

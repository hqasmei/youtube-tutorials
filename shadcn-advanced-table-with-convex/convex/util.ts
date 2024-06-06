import { GenericId, v, Validator } from 'convex/values';

import { TableNames } from './_generated/dataModel';

export function vid<TableName extends TableNames>(
  tableName: TableName,
): Validator<GenericId<TableName>> {
  return v.id(tableName);
}

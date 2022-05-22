const keyExtractor = (item, index) =>
  item.id?.toString() || item.Id?.toString() || index;
export default keyExtractor;

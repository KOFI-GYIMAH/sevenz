export const mapArray = () => {
  const removeDuplicates = (items, key) => [
    ...new Map(items.map((item) => [item[key], item])).values(),
  ];

  const getCategories = (payload) => {
    const new_data = (obj) => {
      const newObj = {};

      newObj.id = obj.id;
      newObj.title = obj.title;

      return newObj;
    };

    const map_data = payload.map(new_data);
    return map_data;
  };

  const getTests = (payload) => {
    const new_data = (obj) => {
      const newObj = {};

      newObj.id = obj.type.id;
      newObj.title = obj.type.title;

      return newObj;
    };

    const map_data = payload.map(new_data);
    const results = removeDuplicates(map_data, "title");
    return results;
  };

  return {
    getCategories,
    getTests,
  };
};

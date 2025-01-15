const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const isType = (type) => ['work', 'home', 'personal'].includes(type);
  if (isType(type)) return type;
};

const parseFavour = (isFavourite) => {
  if (isFavourite === false) return;
  return isFavourite;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseType(contactType);
  const parsedFavour = parseFavour(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedFavour,
  };
};

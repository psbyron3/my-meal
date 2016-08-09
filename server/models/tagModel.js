const db = require('../db/db.js');

const Tag = module.exports;

// only to be used in db init function
// newTag is an object with: { tagName, restriction }
// tagName is a string, restriction is a boolean value
Tag.createTag = function (newTag) {
  return db.Tag.create(newTag);
};

Tag.findTagById = function (tagId) {
  return db.Tag.findById(tagId);
};

// event is a row in the table, tags is an array of tag ids
Tag.addTagsToEvent = function (event, tagIds) {
  return db.Tag.findAll({ where: { id: tagIds } })
    .then((tags) => event.setTags(tags)
      .then(() => event)
    );
};

// used by chefs to edit events; event is a row in the table, tags is an array of tag ids
Tag.removeTagsFromEvent = function (event, tagIds) {
  return db.Tag.findAll({ where: { id: tagIds } })
    .then((tags) => event.removeTags(tags)
      .then(() => event)
    );
};

Tag.getAllTags = function () {
  return db.Tag.findAll();
};

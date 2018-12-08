var Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

var photosAttributesSchema = {
  type: 'object',
  additionalProperties: false,
  maxProperties: 6,
  required: ['photo_url', 'trail_id', 'user_id', 'upload_date', 'caption', 'is_hero_photo'],
  'properties': {
    'photo_url': {'type': 'string'},
    'trail_id': {'type': 'string'},
    'user_id': {'type': 'string'},
    'upload_date': {'type': 'string'},
    'caption': {'type': 'string'},
    'is_hero_photo': {'type': 'boolean'}
  }
};

var photosInnerSchema = {
  'type': 'object',
  additionalProperties: false,
  required: ['attributes', 'type', 'id'],
  maxProperties: 3,
  'properties': {
    'attributes': photosAttributesSchema,
    'type': {'type': 'string'},
    'id': {'type': 'string'}
  }
};

const photosInnerArraySchema = {
  type: 'array',
  additionalProperties: false,
  items: photosInnerSchema
};

const photosSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['data'],
  maxProperties: 1,
  properties: { 'data': photosInnerArraySchema }
};

const heroPhotosSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['data'],
  maxProperties: 1,
  properties: { 'data': photosInnerSchema }
};

var photosCountAttributesSchema = {
  type: 'object',
  additionalProperties: false,
  maxProperties: 6,
  required: ['trail_id', 'count'],
  'properties': {
    'trail_id': {'type': 'string'},
    'count': {'type': 'string'},
  }
};


var photosCountInnerSchema = {
  'type': 'object',
  additionalProperties: false,
  required: ['attributes', 'type'],
  maxProperties: 2,
  'properties': {
    'attributes': photosCountAttributesSchema,
    'type': {'type': 'string'}
  }
};

const photosCountSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['data'],
  maxProperties: 1,
  properties: { 'data': photosCountInnerSchema }
};

var schemaValidation = (schema, obj) => {
  const test = ajv.compile(schema);
  const isValid = test(obj);

  if (!isValid) {
    return { obj, error: test.errors };
  } else {
    return true;
  }
};


/*** Test Objects ***/

// const objPhotos = {
//   data: [
//     {
//       attributes: {
//         "photo_url": "http://aws.amazon.com/983245iuhjkldfjkdf.png",
//         "trail_id": 5,
//         "user_id": 32,
//         "upload_date": 	"2018-11-18T02:06:47.097Z",
//         "caption": "Flowers in Golden Gate Park",
//         "is_hero_photo": true,
//       },
//       type: "trail-photos",
//       id: 2
//     }
//   ]
// };

// const objHeroPhotos = {
//   data:
//     {
//       attributes: {
//         "photo_url": "http://aws.amazon.com/983245iuhjkldfjkdf.png",
//         "trail_id": 5,
//         "user_id": 32,
//         "upload_date": 	"2018-11-18T02:06:47.097Z",
//         "caption": "Flowers in Golden Gate Park",
//         "is_hero_photo": true,
//       },
//       type: "trail-photos",
//       id: 2
//     }
// };


module.exports = {
  schemaValidation,
  photosSchema,
  heroPhotosSchema,
  photosCountSchema
};


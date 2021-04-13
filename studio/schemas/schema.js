// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import category from "./documents/category";
import genre from './documents/genre'
import product from "./documents/product";
import vendor from "./documents/vendor";
import productVariant from "./documents/productVariant";
import brand from "./documents/brand";
import social from "./documents/social";
import ad from "./documents/ad";
import swag from "./documents/swag";
import page from "./documents/page";
import route from "./documents/route";
import siteConfig from "./documents/siteConfig";
import person from "./documents/person";
import popup from "./documents/popup";
import film from './documents/film'
import content from './documents/content'
import subscription from './documents/subscription'

// Object types
import blockContent from "./objects/blockContent";
import cta from "./objects/cta";
import figure from "./objects/figure";
import internalLink from "./objects/internalLink";
import link from "./objects/link";
import portableText from "./objects/portableText";
import simplePortableText from "./objects/simplePortableText";
import contactInfo from "./objects/contactInfo";
import price from './objects/price'
import geoRules from './objects/geoRules'
import country from './objects/country'
import video from './objects/video'
import videoImage from './objects/videoImage'
import s3Object from './objects/s3Object'
import pricing from './objects/pricing'
import currency from './objects/currency'

// Landing page sections
import hero from "./objects/hero";
import imageSection from "./objects/imageSection";
import textSection from "./objects/textSection";

import localeString from "./locale/String";
import localeText from "./locale/Text";
import localeBlockContent from "./locale/BlockContent";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    product,
    content,
    subscription,
    film,
    popup,
    vendor,
    category,
    genre,
    brand,
    social,
    ad,
    swag,
    page,
    route,
    siteConfig,
    person,
    // When added to this list, object types can be used as
    cta,
    figure,
    internalLink,
    link,
    hero,
    imageSection,
    textSection,
    portableText,
    simplePortableText,
    contactInfo,
    blockContent,
    localeText,
    localeBlockContent,
    localeString,
    productVariant,
    price,
    pricing,
    currency,
    geoRules,
    country,
    video,
    videoImage,
    s3Object,
  ]),
});

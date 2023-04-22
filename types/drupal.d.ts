import {DrupalNode, DrupalTaxonomyTerm} from "next-drupal";

interface CustomNode extends DrupalNode {
  field_tags: DrupalTaxonomyTerm[];
}

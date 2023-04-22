import { DrupalNode, DrupalParagraph, DrupalTaxonomyTerm } from "next-drupal";

export interface RichTextField {
  format: string;
  processed: string;
  value: string;
}

export interface CustomNode extends DrupalNode {
  field_tags: DrupalTaxonomyTerm[];
  field_components: DrupalParagraph[];
}

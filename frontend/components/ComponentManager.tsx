import { RichText } from "./Paragraphs/RichText";

export function ComponentManager({ components }) {
  return (
    <>
      {components.map((component) => {
        switch (component.type) {
          case "paragraph--rich_text":
            return (
              <RichText
                key={component.id}
                text={component.field_rich_text.processed}
              />
            );
        }
      })}
    </>
  );
}

# @usewaypoint/document-core

This is the core library used to build the email messages at [Waypoint](https://www.usewaypoint.com). It is non-opinionated and light on dependencies so that it can be used to compose complex documents.

> [!WARNING]
> This library is still under development and the final interface is subject
> to change

## Installation

**Installation with npm**

```
npm install --save @usewaypoint/document-core
```

## Usage

The root of the library is the `DocumentBlocksDictionary` dictionary. This is a mapping of block names to an object with a zod schema and a corresponding React Component.

```
const dictionary = {
  Alert: {
    schema: z.object({
      message: z.string(),
    }),
    Component: ({ message }: { message: string }) => {
      return <div>{message.toUpperCase()}</div>
    }
  }
}
```

This dictionary object is passed as an argument to the builder functions.

### `buildBlockComponent`

```
const Block = buildBlockComponent(dictionary);

<Block type="Alert" data={{message: 'Hello World' }} />
```

### `buildBlockConfigurationSchema`

```
const Schema = buildBlockConfigurationSchema(dictionary);

const parsedData = Schema.safeParse({
  type: 'Alert',
  data: { message: 'Hello World' },
});
```

import React from 'react';

import { render } from '@testing-library/react';

import { Text } from '.';

describe('block-text', () => {
  it('renders with default values', () => {
    expect(render(<Text />).asFragment()).toMatchSnapshot();
  });

  it('sanitizes HTML', () => {
    expect(
      render(
        <Text
          props={{
            markdown: true,
            text: `
<script>alert(1)</script>
<img src=x onerror=alert(1) />

[a](javascript:prompt(document.cookie))
[Basic](javascript:alert('Basic'))
[Local Storage](javascript:alert(JSON.stringify(localStorage)))
[CaseInsensitive](JaVaScRiPt:alert('CaseInsensitive'))
[URL](javascript://www.google.com%0Aalert('URL'))

[In Quotes]('javascript:alert("InQuotes")')
[a](j a v a s c r i p t:prompt(document.cookie))
[a](data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K)
[a](javascript:window.onerror=alert;throw%201)
![Uh oh...]("onerror="alert('XSS'))
![Uh oh...](https://www.example.com/image.png"onload="alert('XSS'))
![Escape SRC - onload](https://www.example.com/image.png"onload="alert('ImageOnLoad'))
![Escape SRC - onerror]("onerror="alert('ImageOnError'))
`,
          }}
        />
      ).asFragment()
    ).toMatchSnapshot();
  });

  it('renders with safe markdown', () => {
    expect(
      render(
        <Text
          props={{
            text: `This <span onClick="alert('!')">text</span> block has the **Markdown** option *turned on*.

- One
- Two
- Three

Powered by [Waypoint](https://usewaypoint.com)`,
            markdown: true,
          }}
        />
      ).asFragment()
    ).toMatchSnapshot();
  });

  it('renders without markdown', () => {
    expect(
      render(
        <Text
          props={{
            text: `## This is not <span>markdown</span>`,
          }}
        />
      ).asFragment()
    ).toMatchSnapshot();
  });
});

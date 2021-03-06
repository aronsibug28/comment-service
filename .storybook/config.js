import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';
import centered from '@storybook/addon-centered/react';
import { checkA11y } from '@storybook/addon-a11y';

addDecorator(centered);
addDecorator(checkA11y);

withInfo({
  inline: true,
  header: true,
  source: true,
});

setTimeout(() => withOptions({
  name: 'sample ui',
  url: '',
  showAddonPanel: true,
  addonPanelInRight: true,
}), 1000);

function loadStories() {
  const req = require.context('../src/stories', true, /.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module)

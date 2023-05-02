# react-umami

# include somewhere, where it will be run once

```
import { registerUmami } from './umami';

registerUmami('http://umami.com:3000');
```

# Track events on a page
```
  const track = useUmami('4867c726-dcb5-47a6-a087-ccc285fd315d');

  const function = () => {
    track('fuction');
  }
```

# Track events in a component
```
  const track = useUmami('4867c726-dcb5-47a6-a087-ccc285fd315d', true);

  const function = () => {
    track('fuction');
  }
```

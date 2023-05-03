# react-umami

# include somewhere, where it will be run once

```
import { registerUmami } from './umami';

//url of the umami intall and id of the page 
registerUmami('http://umami.com:3000', '4867c726-dcb5-47a6-a087-ccc285fd315d');
```

# Track events on a page
```
  const track = useUmami(); //page view will be recorded

  const function = () => {
    track('fuction');
  }
```

# Track events in a component without recording page view
```
  const track = useUmami2(true); //disable recording of the page

  const function = () => {
    track('fuction');
  }
```

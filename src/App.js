import './styles.css';

import Clock from './component/Clock';
import InfoTrain from './component/InfoTrain';

export default function App() {
  return (
    <div className='App'>
      {/*  <div class='box'> */}
      <Clock />
      <InfoTrain />
      {/* </div> */}
    </div>
  );
}

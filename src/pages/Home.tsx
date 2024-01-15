import { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import useApi  from '../hooks/useApi';
import './Home.css';

const Home: React.FC = () => {

  const { searchData } = useApi();

  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log("SEARCH", searchTerm);

  }, [searchTerm])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar 
          value={searchTerm}
          debounce={300}
          onIonChange={(e) => setSearchTerm(e.detail.value!)}
        >
        </IonSearchbar>
        <IonItem>
          <IonLabel>Select Searchtype</IonLabel>
          <IonSelect 
            value={type} 
            onIonChange={(e) => setType(e.detail.value!)}
          >
            <IonSelectOption value={''}>All</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;

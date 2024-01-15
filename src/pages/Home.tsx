import { useEffect, useState } from 'react';
import { IonAvatar, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert, useIonLoading } from '@ionic/react';
import { videocamOutline, tvOutline, gameControllerOutline, tv } from 'ionicons/icons';
import useApi, { SearchType, type SearchResult }  from '../hooks/useApi';
import './Home.css';

const typeIcons: TypeIcons = {
  movie: videocamOutline,
  series: tvOutline,
  game: gameControllerOutline
};

interface TypeIcons {
  [x: string]: string;
}

const Home: React.FC = () => {

  const { searchData } = useApi();

  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]);

  const [presentAlert] = useIonAlert();
  const [loading, dismiss] = useIonLoading();

  useEffect(() => {
    if (searchTerm === '') {
      setResults([]);
      return
    }

    const loadData = async () => {
      await loading();
      const result = await searchData(searchTerm, type);
      dismiss();

      if (result.Error) {
        console.log("LoadData error:", result.Error);
        presentAlert(result.Error);
      } else {
        console.log("loadData result:", result);
        const searchResult = result.Search;
        setResults(searchResult);
      }
    }

    loadData();
  }, [searchTerm, type])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>My Movie App</IonTitle>
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
          <IonSelect 
            label="Select Searchtype"
            value={type} 
            onIonChange={(e) => setType(e.detail.value!)}
          >
            <IonSelectOption value={''}>All</IonSelectOption>
            <IonSelectOption value={'movie'}>Movie</IonSelectOption>
            <IonSelectOption value={'series'}>Series</IonSelectOption>
            <IonSelectOption value={'episodes'}>Episode</IonSelectOption>
            <IonSelectOption value={'game'}>Game</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonList>
          {results.map((item: SearchResult) => (
            <IonItem button detail={true} key={item.imdbID} routerLink={`/movies/${item.imdbID}`}>
              <IonAvatar slot='start'>
                <IonImg src={item.Poster} />
              </IonAvatar>
              <IonLabel class="ion-text-wrap" >{item.Title}</IonLabel>
              {/* <IonIcon slot='end' icon={typeIcons[item.Type]} /> */}
              {item.Type === 'movie' && <IonIcon slot='end' icon={videocamOutline} />}
              {item.Type === 'series' && <IonIcon slot='end' icon={tvOutline} />}
              {item.Type === 'game' && <IonIcon slot='end' icon={gameControllerOutline} />}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;

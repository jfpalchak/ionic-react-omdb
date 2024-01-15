import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react"
import { type RouteComponentProps } from "react-router";
import React, { useState } from "react"
import useApi, { type DetailsResult } from "../hooks/useApi";
import { bodyOutline, clipboardOutline, starHalfOutline, trophyOutline } from "ionicons/icons";
import './Details.css';

interface DetailsPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const Details: React.FC<DetailsPageProps> = ({ match }) => {

  const { getDetails } = useApi();
  const [information, setInformation] = useState<DetailsResult>();
  
  useIonViewWillEnter(() => {
    const loadDetails = async () => {
      const id = match.params.id;
      const data = await getDetails(id);
      setInformation(data);
      console.log("useIonViewWillEnter data:", data);
    }

    loadDetails();
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/movies'></IonBackButton>
          </IonButtons>
          <IonTitle>{information && information.Genre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

      {information &&
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">{information.Title}</IonCardTitle>
              <IonCardSubtitle>
                <div className="ion-float-left">
                  {information.Year}
                </div>
                <div className="ion-float-right">
                  {information.Rated}
                </div>
              </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonImg src={information.Poster} alt={`${information.Title} movie poster.`} />
            <IonItem lines="none">
              <IonIcon icon={starHalfOutline} slot="start" color="warning" />
              <IonLabel>{information.imdbRating}</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      }
      <IonModal 
        trigger="open-modal" 
        initialBreakpoint={0.5}
        breakpoints={[0, 0.25, .5, .75]}
        backdropBreakpoint={0.05}
      >
        <IonContent className="ion-padding"> 

          <IonItem lines="none" className="ion-margin-top">
            <IonIcon slot="start" icon={clipboardOutline} />
            <IonLabel className="ion-text-wrap">{information?.Director}</IonLabel>
          </IonItem>

          <IonItem lines="none">
            <IonIcon slot="start" icon={bodyOutline} />
            <IonLabel className="ion-text-wrap">{information?.Actors}</IonLabel>
          </IonItem>

          <IonItem lines="none">
            <IonIcon slot="start" icon={trophyOutline} />
            <IonLabel className="ion-text-wrap">{information?.Awards}</IonLabel>
          </IonItem>

          <p className="ion-padding">{information?.Plot}</p>
        </IonContent>
      </IonModal>
      </IonContent>
      <IonFooter>
        <IonButton strong expand="block" id="open-modal">Show More</IonButton>
      </IonFooter>
    </IonPage>
  )
}

export default Details;
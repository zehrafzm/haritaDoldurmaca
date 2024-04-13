import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useWindowDimensions,ScrollView, scrollViewRef } from 'react-native';
import { AdEventType, BannerAd, BannerAdSize, RewardedAdEventType, RewardedInterstitialAd, TestIds } from 'react-native-google-mobile-ads';




const HomeScreen = ({ navigation }) => {
  const [toggleD,setToggleD]=useState(false)
  const [toggleP,setToggleP]=useState(false)
  const [toggleO,setToggleO]=useState(false)
  const [toggleG,setToggleG]=useState(false)
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [scrollPositionY, setScrollPositionY] = useState(0);
  const handleScrollY = (event) => {
    setScrollPositionY(event.nativeEvent.contentOffset.y);
  };
  
 // ca-app-pub-1691438736697293/1848331308
  //"expo-build-properties",, app.json plugin
  const [rewardedInterstitialLodaded,setRewardedInterstitialLoaded]= useState(false);
  const rewardedInterstitial = useRef(null);


  const loadRewardedInterstitial = ()=>{
      const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
        RewardedAdEventType.LOADED,
        () =>{
          setRewardedInterstitialLoaded(true);
        }
      );
      const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        () =>{
          setRewardedInterstitialLoaded(false);
        }
      );

      const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
        AdEventType.CLOSED,
        ()=>{
          setRewardedInterstitialLoaded(false);
          rewardedInterstitial.load();
        }
      );
      rewardedInterstitial.load();
      return ()=> {
        unsubscribeLoaded();
        unsubscribeClosed();
        unsubscribeEarned();

      }

  };
  
  useEffect(() => {
    const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();
    return unsubscribeRewardedInterstitialEvents;
  }, []);

  const showRewardedInterstitial = () => {
    if (rewardedInterstitial.current) {
      rewardedInterstitial.current.show();
    } else {
      console.log('Rewarded interstitial ad not loaded yet');
    }
  };

  const AdNavigation = (go2)=>{
    showRewardedInterstitial();
    navigation.navigate(go2);

  }
  return (
    <ScrollView
      ref={scrollViewRef}
      vertical = {true}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      scrollEventThrottle={20}
      onScroll={handleScrollY}
    >
    <View style={[styles.container,{minHeight:windowHeight}]}>

      <Pressable
        style={!toggleD ?styles.button :  [styles.button,{backgroundColor:"#95bf97"}]}
        onPress={() =>setToggleD(!toggleD) }
      >
      <Text style={styles.buttonText}>Dağlar</Text>
      {toggleD &&(
        <View>
        <Pressable
        style={styles.button}
        onPress={() => AdNavigation("Kirikli")
}
        >
        <Text style={styles.buttonText}>Kırıklı Dağlar</Text>
      </Pressable>
       
      <Pressable
        style={styles.button}
        onPress={() => AdNavigation("Kivrimli")
        }
      >
        <Text style={styles.buttonText}>Kıvrımlı Dağlar</Text>
      </Pressable>
          
          
      <Pressable
        style={styles.button}
        onPress={() => AdNavigation("Volkanik2")
}
      >
        <Text style={styles.buttonText}>Volkanik Dağlar</Text>
      </Pressable>
        </View>
      )      } 
      </Pressable>





      <Pressable
        style={!toggleO ?styles.button :  [styles.button,{backgroundColor:"#95bf97"}]}
        onPress={() =>setToggleO(!toggleO) }
      >
      <Text style={styles.buttonText}>Ovalar</Text>
      {toggleO &&(
        <View>
        <Pressable
        style={styles.button}
        onPress={() => AdNavigation("Delta")
}
      >
        <Text style={styles.buttonText}>Delta Ovaları</Text>
      </Pressable>
      
         
     
      <Pressable
        style={styles.button}
        onPress={() => AdNavigation("Karstik")
}
      >
        <Text style={styles.buttonText}>Karstik Ovalar</Text>
      </Pressable>
         
     
      <Pressable
        style={styles.button}
        onPress={() => AdNavigation("VolkanikO")
}
      >
        <Text style={styles.buttonText}>Volkanik Ovalar</Text>
      </Pressable>
        </View>
      )      } 
      </Pressable>



      <Pressable
        style={styles.button}
        onPress={() => AdNavigation("Platolar")
}
      >
        <Text style={styles.buttonText}>Platolar</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => AdNavigation("Akarsular")
}
      >
        <Text style={styles.buttonText}>Akarsular</Text>
      </Pressable>


      <Pressable
        style={!toggleG ?styles.button :  [styles.button,{backgroundColor:"#95bf97"}]}
        onPress={() =>setToggleG(!toggleG) }
      >
      <Text style={styles.buttonText}>Göller</Text>
      {toggleG &&(
        <View>
        <Pressable
        style={styles.button}
        onPress={() => AdNavigation("VolkanikG")
}
      >
        <Text style={styles.buttonText}>Volkanik Göller</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => AdNavigation("KarstikG")
}
      >
        <Text style={styles.buttonText}>Karstik Göller</Text>
      </Pressable>
        <Pressable
        style={styles.button}
        onPress={() => AdNavigation("VolkanikSetG")
}
      >
        <Text style={styles.buttonText}>Volkanik Set Göller</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => AdNavigation("AluvyonG")
}
      >
        <Text style={styles.buttonText}>Alüvyon Set Göller</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => AdNavigation("KiyiSetG")
}
      >
        <Text style={styles.buttonText}>Kıyı Set Göller</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => AdNavigation("HeyelanSetG")
}
      >
        <Text style={styles.buttonText}>Heyelan Set Göller</Text>
      </Pressable>
        </View>
      )      } 
      </Pressable>
      <BannerAd
        unitId= {TestIds.BANNER}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{requestNonPersonalizedAdsOnly:true}}
      />
      
      
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white"
  },
  button: {
    marginTop: 15,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;

/*



<Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Kirikli')}
      >
        <Text style={styles.buttonText}>Kırıklı Dağlar</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Kivrimli')}
      >
        <Text style={styles.buttonText}>Kıvrımlı Dağlar</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Volkanik')}
      >
        <Text style={styles.buttonText}>Volkanik Dağlar</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Volkanik2')}
      >
        <Text style={styles.buttonText}>Volkanik Dağlar2</Text>
      </Pressable>
*/

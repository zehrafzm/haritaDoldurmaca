import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, useWindowDimensions,Image,SafeAreaView, FlatList,Pressable, StyleSheet, ScrollView, Dimensions,TouchableOpacity  } from "react-native";
import Draggable from "react-native-draggable";
import CountUpChronometer from "../Chrono";
import harita2 from "../assets/haritaDogu.png";  //995 x 504
import { ImageBackground } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';


function VolkanikSetG() {
  

  // for the input container
  const scrollViewRef = useRef(null);
  //const windowWidth = Dimensions.get('window').width;
  //const windowHeight = Dimensions.get('window').height;
  const imageWidth = 643;
  const imageHeight = 504;

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const aspectRatio = windowWidth/ imageWidth; // 500 / 1000
  const containerHeight = imageHeight * aspectRatio;  //2000 *  0.5 = 1000 gibi
  const [scrollPositionY, setScrollPositionY] = useState(0);

  const handleScrollY = (event) => {
    setScrollPositionY(event.nativeEvent.contentOffset.y);
  };
  
  //

 
  

  const [mount, setMount] = useState("");
  const [elements, setElements] = useState([]);
  const [score,setScore] = useState(1);
  const [locationX, setLocationX] = useState(null);
  const [locationY, setLocationY] = useState(null);
  
  const [selectedElement,setSelectedElement] = useState(null);
  const [showText, setShowText] = useState(false);
  const [toggleH,setToggleH] = useState(false);


  const [answers,setAnswers]= useState([
    {
        x: 0,
        y: 0,
        minX: .7,
        maxX: .9,
        minY: .32,
        maxY: .52,
        name: " VAN",
        isim: "Van"
      },
    {
        x: 0,
        y: 0,
        minX: .64,
        maxX: .84,
        minY: .31,
        maxY: .51,
        name: "NAZIK",
        isim: "Nazik"
      },
    {
        x: 0,
        y: 0,
        minX: .75,
        maxX: .95,
        minY: .33,
        maxY: .53,
        name: "ERCEK",
        isim: "Erçek"
      },
    {
        x: 0,
        y: 0,
        minX: .64,
        maxX: .84,
        minY: .28,
        maxY: .48,
        name: "HACLI",
        isim: "Haçlı"
      },
    {
        x: 0,
        y: 0,
        minX: 0.77,
        maxX: 0.97,
        minY: 0.16,
        maxY: 0.36,
        name: "BALIK",
        isim: "Balık"
      },
    {
        x: 0,
        y: 0,
        minX: 0.7,
        maxX: 0.9,
        minY: 0.02,
        maxY: 0.22,
        name: "CILDIR",
        isim: "Çıldır"
      },
  ])



  const handlePress = (event) => {
    const { locationX: x, locationY: y } = event.nativeEvent;
    setLocationX(x);
    setLocationY(y);
    //alert("X: "+(locationX)/windowWidth +" Y:"+(locationY)/containerHeight);
  };
  
  
  useEffect(() => {//horizontal screen 
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  
    //lockOrientation();
  
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);
  
  
      
  
    
  useEffect(() => {//correct place or not
      if(selectedElement){
        let s  = 0;
      if(
                    locationX /windowWidth    >= selectedElement.minX  &&
                    locationX /windowWidth    <= selectedElement.maxX &&
                    locationY/containerHeight >= selectedElement.minY&&
                    locationY/containerHeight <= selectedElement.maxY
      ){
        s+=1;
                      //alert(`Congratulations! ${selectedElement.content}`);
                      setScore(score+1);
                      selectedElement.x  = windowWidth*(selectedElement.maxX +selectedElement.minX)/ 2;
                      selectedElement.y  = containerHeight*(selectedElement.maxY +selectedElement.minY)/2;
              
                      selectedElement.stat = 1;
                     // alert(selectedElement.content);
                     // alert(selectedElement.stat);
                    setLocationX(null);
                    setLocationY(null);
      }
      }
      });  
  
    
    
   
    //CONVERT INTO ENGLISH TYPO
  const convertEnglish = (input) => {
      input = input.trim();
      let result = [];
      for (const char of input) {
        if (char === "ı") {
          result.push("i");
        } else if (char === " ") {
          result.push("");
        } else if (char === "ö") {
          result.push("o");
        } else if (char === "ğ") {
          result.push("g");
        } else if (char === "ü") {
          result.push("u");
        } else if (char === "ç") {
          result.push("c");
        } else if (char === "ş") {
          result.push("s");
        } else {
          result.push(char); 
        }
       
      }
      return result.join("").toUpperCase(); 
    };  
    
  const compare = (mount) => {
    const newMount = convertEnglish(mount); 
    
      const existingElement = elements.find((element) => element.content === newMount);
      if (!existingElement) {
        const matchingAnswer = answers.find((answer) => answer.name === newMount);
        if (matchingAnswer) {
          const newElement = {
            id: elements.length + 1,
            x: 0,
            y: 0,
            minX: matchingAnswer.minX,
            maxX: matchingAnswer.maxX,
            minY: matchingAnswer.minY,
            maxY: matchingAnswer.maxY,
            content: matchingAnswer.name,
            isim: matchingAnswer.isim,
            stat: 0,
            selected: 0
          };
          setElements([...elements, newElement]);
        }
      }
      setMount("");
    
  };
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowText(false);
    }, 1000);
    return () => {
      setShowText(true);
      clearTimeout(timeoutId);
    };
  }, [locationX]);
    
  let nextId = 0;
  const autoFill = () => {
    autoPlace();
    setScore(6);
    const updatedElements = elements.map((element) => {
      const matchingAnswer = answers.find((answer) => element.content === answer.name);
      if (matchingAnswer) {
        return {
          
          ...element,
          x: windowWidth*(element.minX+element.maxX)/2,
          y: containerHeight*(element.minY+element.maxY)/2,
          stat: 1,
        };
      }
      return element;
    });
  
    setElements([...updatedElements]);
  };
  const autoPlace = () => {
    setToggleH(true);

    const updatedElements = elements.map((element) => {
      const matchingAnswer = answers.find((answer) => element.content === answer.name);
      if (matchingAnswer) 
      return element;
    });
  
    const newElements = answers
      .filter((answer) => !elements.find((element) => element.content === answer.name))
      .map((answer) => ({
        id: nextId++, // Use the nextId and then increment it for each new element
        x: (nextId*30)% 200,
        y: (nextId++*10)%300 ,
        minX: answer.minX,
        maxX: answer.maxX,
        minY: answer.minY,
        maxY: answer.maxY,
        content: answer.name,
        isim: answer.isim,
        stat: 0,
        selected:0
      }));
  
    setElements([...updatedElements, ...newElements]);
  };
  
  
    
  const handleTouch = (element) => {
      setSelectedElement(element);
      //alert(element.content);
    };  
  
  
  
    return (
      
      <ScrollView
        ref={scrollViewRef}
        vertical = {true}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={20}
        onScroll={handleScrollY}
      >
      
     
      <View >
      <View style={[styles.chronometer1, { top: containerHeight*.75, left:windowWidth*.67}]}>
            <CountUpChronometer />
            <View style={styles.inputContainer} >
            <Text style={{fontSize:windowWidth*0.015}}> 
            score: {score} / 6
            <Text style={{opacity:0}}>   </Text> {/*boşluk için*/}
  
            <Pressable style={
                    [!toggleH ? {backgroundColor:"grey"}:
                    {backgroundColor:"green"}, { marginTop: 5, padding: 5, borderRadius: 5,}]
                   } onPress={()=> autoFill()}> 
            <Text style={styles.buttonText}>hepsini yerleştir</Text></Pressable> 
  
            
            <Pressable style={styles.button} onPress={()=> autoPlace()}>
            <Text style={styles.buttonText}>hepsini ekle</Text></Pressable>   
                 
            </Text>
          
                <TextInput
                style={[styles.input,{fontSize:windowWidth*0.015}]}
                placeholder=" Volkanik Set GÖlleri"
                value={mount}
                onChangeText={(text) => setMount(text)}
                onSubmitEditing={() => compare(mount)} //  triggers compare(mount) on Enter press
  
                />
                <Text>
                <Pressable
                style={styles.button}
                onPress={() => compare(mount)}>
                  <Text style={[styles.buttonText]}>ekle</Text></Pressable>
                  
                </Text>
                
                   
            </View>
        </View>
        
        <TouchableOpacity
        onPress={handlePress}
        >
  
      <ImageBackground
        source={harita2}
        style={[
          styles.imageBackground,
          { width: windowWidth * 1, height: containerHeight * 1 },
        ]}
      >
      <Draggable
              key={999999}
              x={.81* windowWidth}
              y={.42* containerHeight}
              minX={.81* windowWidth}
              maxX={.81* windowWidth}
              minY={.42* containerHeight}  
              maxY={.42* containerHeight}              
            >
            {/**
                      { showText&&    <Text style={{color:"green"}}>doğru!!!</Text> }
             */}
              <View
                style={{backgroundColor:"white",
                borderRadius: 15,
                borderWidth:3,
                borderColor:"#f2d2c4",
                    alignItems:"center",
                    padding: 5,
                    backgroundColor: "#824328"
                }}
                
              >
                <Text style={{padding:2, color:"whitesmoke",fontSize:aspectRatio*10}} >Van</Text>
              </View>
            </Draggable>
      {/**
            { showText&&    <Text style={{color:"red"}}>yanlış!!!</Text> }
       */}
        {elements
          .filter((element) => element.stat === 1)
          .map((element) => (
            <Draggable
              key={element.id}
              x={(element.x)}
              y={(element.y)}
              minX={element.x}
              maxX={element.x}
              minY={element.y}
              maxY={element.y}          
            >
            {/**
                      { showText&&    <Text style={{color:"green"}}>doğru!!!</Text> }
             */}
              <View
                style={{backgroundColor:"white",
                borderRadius: 15,
                borderWidth:3,
                borderColor:"#f2d2c4",
                    alignItems:"center",
                    padding: 5,
                    backgroundColor: "#824328"
                }}
                
              >
                <Text style={{padding:2, color:"whitesmoke",fontSize:aspectRatio*10}} >{element.isim}</Text>
              </View>
            </Draggable>
          ))}
      </ImageBackground>
  
        </TouchableOpacity>
        <View  >
        
        
        <View style={[styles.container,{height:containerHeight}]}>
  
                {elements.map((element) => ( 
                  <TouchableOpacity
                  onPress={() => handleTouch(element)}
                  style={
                    [element.stat===1 ? {backgroundColor:"grey"}:
                    element === selectedElement ? styles.correctBox:
                    styles.draggableBox,
                   {width: windowWidth * 0.15,
                    height: "fitContent",
                    left: (element.id % 5) * windowWidth * 0.2,
                    top: (element.id % 5) *5 ,
                    borderRadius: 15,
                    borderWidth:3,
                    borderColor:"#f2d2c4",
                    alignItems:"center",
                    padding: 0,}]
                   }
                >
                <Text style={{padding:2, color:"whitesmoke"}} >{element.isim}</Text>              
                  </TouchableOpacity>
                  
                ))}
        
        
                
              </View>
  
        </View>
        
      </View>
      
        
  
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"white"
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
  
    image: {
      flex: 1,
      resizeMode: "contain",
      justifyContent: "center",
    },
    
    draggableBox: {
      backgroundColor: "#824328",
      borderColor:"#f2d2c4",
      
     
    },
    correctBox : {
      backgroundColor: "#8ee88e",
      
  
    },
    inputContainer: {
      //flexDirection:"row",
      width: "fitContent",
      height:"fitContent",
      //position: 'absolute',
      backgroundColor: 'whitesmoke',
      zIndex: 1, 
    },
    input: {
      width: "100%",
      height: 20,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 5,
      paddingHorizontal: 5,
    },
    button: {
      marginTop: 5,
      backgroundColor: 'green',
      padding: 5,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 8,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    chronometer1: {
      position: 'absolute',
      left: 0,    
      zIndex: 1,
    },
  });
  
  export default VolkanikSetG;
  
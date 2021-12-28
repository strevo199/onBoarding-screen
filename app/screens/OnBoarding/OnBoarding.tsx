import React, { useEffect, useState } from 'react'
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Theme,Images } from '../../constants/Index'


const {COLORS,FONTS,SIZES} = Theme

const {onboarding1,onboarding2,onboarding3} = Images

const onboardings =[
    {   
        img:onboarding1,
        title:"Let's  Travelling",
        description:'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer '
    },
    {   
        img:onboarding2,
        title:"Let's  Travelling",
        description:'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer '
    },
    {   
        img:onboarding3,
        title:"Let's  Travelling",
        description:'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer '
    }
]

const OnBoarding = () => {
    const [completed, setcompleted] = useState(false)

    const scrollX = new Animated.Value(0)

    useEffect(() => {
        // To check if user has finished scrolling the onboardingpages
        scrollX.addListener(({value}) => {
            if (Math.floor(value/ SIZES.width) === onboardings.length -1) {
                setcompleted(true)
            }
        })
        return () =>scrollX.removeAllListeners()
    }, [])

    const renderContent = () => {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment= "center"
                showsHorizontalScrollIndicator ={false}
                onScroll={Animated.event([
                    {nativeEvent:{contentOffset:{x:scrollX}}},
                ],{useNativeDriver:false})}
            > 
                { 
                    onboardings.map((item,index) =>{
                        return(
                            <View
                                key={index}
                                style ={{flex:1,width:SIZES.width,justifyContent:'center',alignItems:'center'}}
                            >
                                <Image
                                    source={item.img}
                                    resizeMode="cover"
                                    style ={{
                                        width:'100%',
                                        height:'100%'
                                    }}
                                />
                                {/* Text */}
                                <View style ={{position:'absolute',bottom:'10%',backgroundColor:COLORS.trans}}>
                                    <View style ={{paddingHorizontal:SIZES.h1}}>
                                        <Text style ={{lineHeight:60,color:COLORS.white,fontSize:SIZES.h1,textAlign:'center'}} >{item.title}</Text>
                                        <Text style ={{lineHeight:25,textAlign:'center',color:COLORS.white}}>{item.description}</Text>
                                    </View>
                                    </View>
                                    {/* Buttom */}
                                    <TouchableOpacity
                                        style ={{
                                            position:'absolute',
                                            bottom:0,
                                            right:0,backgroundColor:COLORS.blue,
                                             width:150,
                                             height:60 ,
                                             justifyContent:'center',
                                             paddingLeft:20,
                                             borderTopLeftRadius:30,
                                             borderBottomLeftRadius:30,
                                        }}
                                        onPress={() => console.log('lala')}
                                    >
                                        <Text style ={{fontSize:SIZES.h2,fontWeight:'600',color:COLORS.white }}>{ completed ? "Let's Go": 'Skip' }</Text>
                                    </TouchableOpacity>
                                </View>       
                        )  
                    })
                } 
            </Animated.ScrollView>
        )
    }

    const renderDot =() => {

         const dotPosition = Animated.divide(scrollX,SIZES.width)

        return (
          <View style={styles.dotContainer}>
            {onboardings.map((item, index) => {
              const opacity = dotPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.3,1,0.3],
                extrapolate:"clamp"
              }); 
              const dotSize = dotPosition.interpolate({

                inputRange:[index-1,index,index+1],
                outputRange: [SIZES.base,17,SIZES.base],
                extrapolate:"clamp"
              })

              return (
                <Animated.View
                  key={`dot-${index}`}
                  opacity ={opacity}
                  style={[styles.dot, { width: dotSize, height: dotSize}]}
                ></Animated.View> 
              );
            })}
          </View>
        );
    }

    return (
        <SafeAreaView style ={styles.container}>
            <View>
                {renderContent()}
            </View>
            <View style = {styles.dotRootContainer}> 
                {renderDot()}
            </View>
        </SafeAreaView>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.white
    }, 
    dot:{
        borderRadius:SIZES.radius,
        backgroundColor:COLORS.blue,
        marginHorizontal:SIZES.radius/2
    },
    dotContainer:{
        flexDirection:'row',
        height:SIZES.padding ,
        alignItems:'center',
        justifyContent:'center',
    },
    dotRootContainer:{
        position:'absolute',
        bottom:SIZES.height > 700 ? "35%" :"20%"
    }
})

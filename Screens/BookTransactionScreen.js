import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,TextInput,Image} from 'react-native';

import * as Permissions from 'expo-permissions';
import {BarCodeScanner}  from 'expo-barcode-scanner'  

export default class TransactionScreen extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissions:null,
            scanned:false,
           
            buttonState:"normal",
            scannedBookID:"",
            scannedStudentID:""
        }
    }
    handleBarCodeScanned=async({type,data})=>{
        const {buttonState}= this.state
       if( buttonState === "BookId") {this.setState({
            scanned:true,
            scannedBookID:data,
            buttonState:"normal"
        })}else if ( buttonState === "StudentId"){
            this.setState({
                scanned:true,
                scannedStudentID:data,
                buttonState:"normal"
            })}
    }
     getCameraPermission=async(id)=>{
         const {status}=await Permissions.askAsync(Permissions.CAMERA)
         this.setState({hasCameraPermissions:status ===  "granted" ,
                  buttonState :id,
                  scanned:false
        })
    }

    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState !== "normal" && hasCameraPermissions  ){
            return(
                <BarCodeScanner
                 onBarCodeScanned={scanned? undefined:this.handleBarCodeScanned}
                 style={StyleSheet.absoluteFillObject}
                />

            )
        }else if(buttonState === "normal"){
        return(

            
            <View style={styles.container}>
                <View>
                    <Image
                    style={{  width:200,height:200}}
                    source={require("../assets/booklogo.jpg")}

                    />
                    <Text style={{textAlign:"center",fontSize:30}}> Wily</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.inputBox}
                    placeholder="BookId"
                    value={this.state.scannedBookID}
                    />
                    <TouchableOpacity
                    style={styles.scanButton}
                    onPress={()=>{
                        this.getCameraPermission("BookId")
                    }}
                    > 
                    <Text style={styles.buttonText}> Scan</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.inputBox}
                    placeholder="StudentId"
                    value={this.state.scannedStudentID}
                    />
                    <TouchableOpacity
                    onPress={()=>{
                        this.getCameraPermission("StudentId")
                    }}
                    style={styles.scanButton}
                    > 
                    <Text style={styles.buttonText}> Scan</Text>
                    </TouchableOpacity>
                </View>
           
                
              
            </View>
        )}
    }
}

const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            justifyContent:"center",
            alignItems:"center"
        },
        displayText:{
            textAlign:"center",
          textDecorationLine:"underline",
          fontSize:30,
          padding:20
        },
        scanButton:{
            backgroundColor:"yellow",
            width:50,
            heigth:40,
            borderLeftWidth:0,
            
            
            borderWidth:1.5
        },
        buttonText:{
            textAlign:"center",
            fontSize:20
        },
        inputBox:{
         width:200,
         height:40,
         borderWidth:1.5,
         fontSize:20
        },
        inputView:{
            flexDirection:"row",
            margin:20

        }
    }
)

import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, KeyboardAvoidingView, Image, Modal, ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ListItem, Card, Icon, withTheme } from 'react-native-elements';

export default class WelcomeScreen extends React.Component {
  constructor(){
    super();
    this.state = {
        emailID: '',
        password: '',
        isModalVisible: false,
        firstName: '',
        lastName: '',
        address: '',
        contact: '',
        confirmPassword: '',
        points: 0, 
    }   
  }

  fetchImage = (imageName) => {
    var storageRef = firebase.storage().ref().child("user_profiles/"+imageName);
    storageRef.getDownloadURL()
    .then((url)=>{
        this.setState({
            image: url
        })
    })
    .catch((error)=>{
        this.setState({
            image: '#'
        })
    })
}

  userSignUp = (emailID,password,confirmPassword) => {
    if(password !== confirmPassword) {
        return alert("Password does not match. \n Check your password.")
    }  
    else if(this.state.firstName !== '' &&
            this.state.lastName !== ''  &&
            this.state.emailID !== '' &&
            this.state.password !== ''){
        firebase.auth().createUserWithEmailAndPassword(emailID, password)
        .then(()=>{
            //console.log(this.state)
          db.collection("Users").add({
              'firstName': this.state.firstName,
              'lastName': this.state.lastName,
              'contact': this.state.contact,
              'emailID': this.state.emailID,
              'password': this.state.password,
              'points': 0,
              'description': ''
          })
         // return Alert.alert("User added successfully.",
          //[{text: 'OK', onPress: () => this.setState({
              //isModalVisible: false
         // })}]);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage);
        });
    }
    else if(this.state.firstName === ''){
        return alert("Please enter your first name.");
    }
    else if(this.state.lastName === ''){
        return alert("Please enter your last name.");
    }
    else if(this.state.emailID === ''){
        return alert("Please enter your email address.");
    }
    else if(this.state.password === ''){
        return alert("Please enter your password.");
    }
  }

  userLogin = (emailID,password) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(()=>{
        //console.log(emailID, password);
        firebase.auth().signInWithEmailAndPassword(emailID,password)
        .then(()=>{
            this.props.navigation.navigate('HomeScreen');
        })
        .catch((error)=>{
            //var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage);
        })
    })
       
      
  }

  showModal = () => {
    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}> 
          <View style={styles.modalContainer}>
              <ScrollView style={{width: '100%'}}>
                  <KeyboardAvoidingView style={styles.KeyboardAvoidingView} behavior="padding" enabled>
                  <Text style={styles.modalTitle}> Register </Text>
                  <TextInput
                  style={styles.formTextInput}
                  placeholder="First Name"
                  maxLength={8}
                  onChangeText={(text)=>{
                      this.setState({
                          firstName: text
                      })
                  }}/>

                  <TextInput
                  style={styles.formTextInput}
                  placeholder="Last Name"
                  maxLength={8}
                  onChangeText={(text)=>{
                      this.setState({
                          lastName: text
                      })
                  }}/>

                  <TextInput
                  style={styles.formTextInput}
                  placeholder="Contact"
                  maxLength={10}
                  keyboardType={'numeric'}
                  onChangeText={(text)=>{
                      this.setState({
                          contact: text
                      })
                  }}/>

                  <TextInput
                  style={styles.formTextInput}
                  placeholder="Email"
                  keyboardType={'email-address'}
                  onChangeText={(text)=>{
                      this.setState({
                          emailID: text
                      })
                  }}/>
                  
                  <TextInput
                  style={styles.formTextInput}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(text)=>{
                      this.setState({
                          password: text
                      })
                  }}/>
                  
                  <TextInput
                  style={styles.formTextInput}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  onChangeText={(text)=>{
                      this.setState({
                          confirmPassword: text
                      })
                  }}/>

                  <View style={styles.modalBackButton}>
                      <TouchableOpacity 
                      style={styles.registerButton}
                      onPress={()=>{
                          this.userSignUp(this.state.emailID, this.state.password, this.state.confirmPassword)
                      }}>
                          <Text style={styles.registerButtonText}> Register </Text>
                      </TouchableOpacity>
                  </View>

                  <View style={styles.modalBackButton}>
                      <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={()=>this.setState({
                          isModalVisible: false
                      })}>
                          <Text style={{color: '#0d1d52'}}> Cancel </Text>
                      </TouchableOpacity>
                  </View>
                  </KeyboardAvoidingView>
              </ScrollView>
          </View>

        </Modal>
    )
}

componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.navigation.navigate('HomeScreen')
        } else {
           this.props.navigation.navigate('WelcomeScreen');
        }
      });
}

  render(){
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
           <View style={{justifyContent: 'center', alignItems: 'center'}}>
        </View>
          {this.showModal()}
          <View style={{justifyContent: 'center'}}>
            <Image
            source={require('../assets/AppLogoInfo.png')}
            style={{width: 400, height: 400, alignItems: 'center',marginTop: 0, bottom: "10%"}}/>
              <Text style={styles.title}> Info Brain </Text>
          </View>
        
          <Card containerStyle={{position: 'absolute', bottom: 50, borderRadius: 10}}>
            <KeyboardAvoidingView behavior="position" enabled>
                <TextInput
                style={styles.loginBox}
                placeholder="Email"
                placeholderTextColor="black"
                keyboardType='email-address'
                onChangeText={(text)=>{
                    this.setState({
                        emailID: text
                    })
                }}
                />

                <TextInput
                style={styles.loginBox}
                placeholder="Password"
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({
                        password: text
                    })
                }}/>
            </KeyboardAvoidingView>

            <View>
                <TouchableOpacity 
                style={styles.loginButton}
                onPress={()=>{
                    this.userLogin(this.state.emailID,this.state.password)
                    
                }}> 
                    <Text style={styles.loginText}> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.loginButton}
                onPress={()=>{this.setState({
                    isModalVisible: true
                })}}> 
                    <Text style={styles.loginText}> Sign Up </Text>
                </TouchableOpacity>
            </View>
          </Card>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0d1d52',
      alignItems: 'center',
    },
    title: {
        fontSize: 50,
        marginTop: 0,
        textAlign: 'center',
        fontWeight: '600',
        paddingBottom: 0,
        color: 'white',
        bottom: "30%"
    },
    loginBox: {
        width: 300,
        height: 50,
        borderBottomWidth: 2,
        borderColor: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 20,
        paddingLeft: 0,
        paddingBottom: 30
    },
    loginButton: {
        backgroundColor: 'white',
        borderRadius: 25,
        margin: 15,
        width: 300,
        height: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    loginText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#0d1d52',
        fontWeight: '600'
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginRight: 30,
        marginLeft: 30,
        marginTop: 80,
        marginBottom: 80
      },
      KeyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      modalTitle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 30,
        color: '#0d1d52',
        margin: 50
      },
      formTextInput: {
        width: '75%',
        height: '7%',
        alignSelf: 'center',
        borderColor: '#0d1d52',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10
      },
      modalBackButton: {
          
      },
      registerButton: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30
      },
      cancelButton:{
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
      },
      registerButtonText: {
        color: '#0d1d52',
        fontSize: 15,
        fontWeight: 'bold' 
      }
  });

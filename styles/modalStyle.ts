import { StyleSheet } from 'react-native';


// 기존 컬러 코드
// const callButtonColor = "#6D9BC8";

// 더 쨍한 버전
const callButtonColor = "#2E83FF"

export const modalStyles = StyleSheet.create({
    favoritesButton: {
      position: 'absolute',
      top: 20,
      left: '50%',
      transform: [{ translateX: -50 }],
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 20,
      zIndex: 1000,
    },
    favoritesButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainerList: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 32,
      minHeight: '30%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalContentList: {
      backgroundColor: 'white',
      padding: 32,
      minHeight: '30%', 
      borderRadius: 20,
    },
    modalContentCombine: {
      flex: 1,
      // flexWrap: "wrap",
      position: "absolute",
      bottom: 0,
      backgroundColor: 'white',
      padding: 32,
      height: "75%",
      width: '100%', 
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    mapView: {
      width: 300,
      height: 300,
      marginBottom: 10,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 10,
    },
    pharmacyName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    openStat: {
      color: 'green',
      fontWeight: 'bold',
      fontSize: 18,
    },
    closeStat: {
      color: 'red',
      fontWeight: 'bold',
      fontSize: 18,
    },
    callButton: {
      backgroundColor: callButtonColor,
      padding: 10,
      borderRadius: 10,
      marginTop: 10,
    },
    callButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    closeButton: {
      backgroundColor: 'grey',
      padding: 10,
      borderRadius: 10,
      marginTop: 10,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    favoriteIcon: {
      position: 'absolute',
      top: 23,
      right: 25,
      padding: 10,
      zIndex: 1001,
    },
    favoriteIconList: {
      position: "absolute",
      top: 0,
      right: 0,
    },
  });
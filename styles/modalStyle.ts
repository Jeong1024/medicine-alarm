import { StyleSheet } from 'react-native';

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
      marginBottom: 10,
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
      backgroundColor: 'blue',
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
      top: 32,
      right: 32,
      padding: 10,
      zIndex: 1001,
    },
    favoriteIconList: {
      marginLeft: 10,
    }
  });
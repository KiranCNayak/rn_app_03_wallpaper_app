import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backButtonTouchableContainerStyle: {
    left: 16,
    position: 'absolute',
    top: 16,
    zIndex: 1,
  },

  backButtonTouchableStyle: {
    alignItems: 'center',
    backgroundColor: '#0009',
    borderRadius: 15,
    height: 50,
    justifyContent: 'center',
    margin: 20,
    width: 50,
  },

  container: {
    alignItems: 'center',
    backgroundColor: '#222222',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },

  downloadingImageTextStyle: {
    fontSize: 24,
    fontWeight: '900',
    marginVertical: 8,
  },

  downloadTouchableContainerStyle: {
    alignItems: 'center',
    height: '80%',
    justifyContent: 'center',
    width: '100%',
  },

  downloadTouchableStyle: {
    alignItems: 'center',
    borderRadius: 32,
    backgroundColor: 'rgba(225,225,225,0.9)',
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    width: 64,
  },

  fullScreenStyle: {
    height: '100%',
    width: '100%',
  },

  imageBGStyle: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 16,
    elevation: 20,
    flex: 1,
    justifyContent: 'center',
    margin: '50%',
    shadowColor: '#fff',
    width: '80%',
  },

  loadingIndicatorContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  pleaseWaitTextStyle: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default styles;

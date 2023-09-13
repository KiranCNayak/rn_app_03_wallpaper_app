import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#222222',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },

  emptyDataTitleStyle: {
    color: '#f00',
    fontSize: 30,
    fontWeight: '700',
    marginVertical: 8,
    textDecorationLine: 'line-through',
  },

  emptyDataRootContainerStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  emptyListImageStyle: {
    height: 300,
    resizeMode: 'center',
    width: '100%',
  },

  fullScreenStyle: {
    height: '100%',
    width: '100%',
  },

  imageItemContainerStyle: {
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
  },

  imageItemStyle: {
    borderRadius: 16,
    height: '100%',
    width: '95%',
  },

  notFoundTextStyle: {
    color: '#d44',
    fontSize: 18,
    fontWeight: '700',
  },

  titleTextContainerStyle: {
    alignItems: 'center',
  },

  titleTextStyle: {
    fontSize: 30,
    fontWeight: '700',
    marginVertical: 8,
  },
});

export default styles;

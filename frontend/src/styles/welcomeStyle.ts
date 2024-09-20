import {StyleSheet} from 'react-native';
import {theme} from '../contants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brandName: {
    color: theme.primaryText,
    fontWeight: '800',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    marginTop: 20,
  },

  welcomeLogo: {
    width: '100%',
    height: 300,
    marginTop: -100,
  },
  welcomText: {
    width: '70%',
    textAlign: 'center',
    color: theme.primaryText,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
  forwardBtn: {
    position: 'absolute',
    width: '80%',
    bottom: 50,
    padding: 15,
    borderRadius: 50,
    backgroundColor: theme.primary,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    zIndex: 1,
  },
});

import {StyleSheet} from 'react-native';
import metrics from './metrics';
import colors from './colors';
import fonts from './fonts';

const general: StyleSheet.NamedStyles<any> = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    margin: metrics.doubleBaseMargin,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: fonts.regular,
    alignSelf: 'center',
    marginBottom: metrics.doubleBaseMargin,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
};

export default general;

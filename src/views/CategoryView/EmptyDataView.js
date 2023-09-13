import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';

import { IMAGES } from '../../data/IMAGES';
import styles from './styles';

const EmptyDataView = ({ query }) => {
  return (
    <View style={styles.emptyDataRootContainerStyle}>
      <Text style={styles.emptyDataTitleStyle}>{`${query}`}</Text>
      <Text style={styles.notFoundTextStyle}>{'Not found !'}</Text>
      <Text style={styles.notFoundTextStyle}>
        {'Try again with different text.'}
      </Text>

      <Image source={IMAGES.IMG_EMPTY_BOX} style={styles.emptyListImageStyle} />
    </View>
  );
};

export default memo(EmptyDataView);

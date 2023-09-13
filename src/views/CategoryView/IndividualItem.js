import React, { memo } from 'react';
import { Image, TouchableOpacity, useWindowDimensions } from 'react-native';

import styles from './styles';

const IndividualItem = ({ item, onIndividualImagePress }) => {
  const { height } = useWindowDimensions();

  return (
    <TouchableOpacity
      onPress={() => onIndividualImagePress(item)}
      style={[
        styles.imageItemContainerStyle,
        { width: '50%', height: 0.2 * height },
      ]}>
      <Image source={{ uri: item.src.medium }} style={styles.imageItemStyle} />
    </TouchableOpacity>
  );
};

export default memo(IndividualItem);

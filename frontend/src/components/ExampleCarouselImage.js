import React from 'react';
import PropTypes from 'prop-types';

function ExampleCarouselImage({ src, alt }) {
  return (
    <img
      className="d-block w-100" style={{ height: '70vh', objectFit: 'fill' }}
      src={src}
      alt={alt}
    />
  );
}

ExampleCarouselImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ExampleCarouselImage;

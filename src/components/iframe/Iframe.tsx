import React from 'react';

interface Props {
  title: string;
  iframeSrc: string;
  iframeSize: { width: string; height: string };
  style?: Record<string, unknown>;
  onLoad?: () => void; // Add onLoad prop
}

/**
 * Renders Iframe with specified params. Used to embed external apps | services in windows.
 * @function Iframe
 * @param {string} title - title of iframe
 * @param {string} iframeSrc - url of iframe
 * @param {object} iframeSize - size of iframe window, eg 100% or 100px
 * @param {Record<string, unknown>} style - inline css design-system to be applied
 * @param {() => void} onLoad - callback when iframe finishes loading
 * @returns {JSX.Element} - Rendered Iframe component
 */
const Iframe = ({
  title,
  iframeSrc,
  iframeSize,
  style,
  onLoad,
}: Props): JSX.Element => {
  return (
    <iframe
      src={iframeSrc}
      title={title}
      width={iframeSize.width}
      height={iframeSize.height}
      style={style}
      onLoad={onLoad}
    />
  );
};

export default Iframe;
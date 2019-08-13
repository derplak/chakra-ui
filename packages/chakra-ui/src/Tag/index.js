/** @jsx jsx */
import { jsx } from "@emotion/core";
import useBadgeStyle from "../Badge/styles";
import Icon from "../Icon";
import Box from "../Box";
import Center from "../Center";
import PseudoBox from "../PseudoBox";
import { createContext, useContext } from "react";

const tagSizes = {
  sm: {
    minHeight: 5,
    minWidth: 5,
    fontSize: "sm",
    px: 2,
  },
  md: {
    minHeight: 6,
    minWidth: 6,
    fontSize: "sm",
    px: 2,
  },
  lg: {
    minHeight: 7,
    minWidth: 7,
    px: 3,
  },
};

const TagContext = createContext();
const useTagContext = () => {
  return useContext(TagContext);
};

export const TagAddon = ({ placement, ...props }) => {
  const margin = { sm: -1, md: -1, lg: -2 };
  const sizes = { sm: 5, md: 6, lg: 6 };
  const { size } = useTagContext();

  const _placement = {
    left: { ml: margin[size] },
    right: { mr: margin[size] },
  };

  return (
    <Center
      transition="all 0.2s"
      size={sizes[size]}
      {..._placement[placement]}
      {...props}
    />
  );
};

export const TagCloseButton = props => {
  const margin = { sm: -2, md: -2, lg: -3 };
  const { size } = useTagContext();

  return (
    <PseudoBox
      as="button"
      display="flex"
      alignItems="center"
      justifyContent="center"
      transition="all 0.2s"
      alignSelf="stretch"
      rounded="full"
      opacity="0.5"
      mr={margin[size]}
      width={tagSizes[size]["minWidth"]}
      _focus={{
        boxShadow: "outline",
        bg: "rgba(0, 0, 0, 0.14)",
      }}
      _hover={{
        opacity: "0.8",
      }}
      _active={{
        opacity: "1",
      }}
      {...props}
    >
      <Icon size="18px" name="small-close" focusable="false" />
    </PseudoBox>
  );
};

export const TagLabel = props => {
  return (
    <Box
      maxWidth={14}
      overflow="hidden"
      wordBreak="truncate"
      lineHeight="1.2"
      as="span"
      {...props}
    />
  );
};

const Tag = ({ variant = "subtle", size = "lg", color, ...rest }) => {
  const tagStyleProps = useBadgeStyle({ color, variant });
  const sizeProps = tagSizes[size];

  return (
    <TagContext.Provider value={{ size }}>
      <PseudoBox
        display="inline-flex"
        alignItems="center"
        minHeight={6}
        maxWidth="100%"
        rounded="md"
        fontWeight="medium"
        {...sizeProps}
        {...tagStyleProps}
        {...rest}
      />
    </TagContext.Provider>
  );
};

export default Tag;
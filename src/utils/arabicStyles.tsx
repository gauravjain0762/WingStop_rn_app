export const textRTL = (language: string) => {
  return {textAlign: language === 'ar' ? 'right' : 'left'};
};

export const flipImage = (language: string) => {
  return {transform: [{scaleX: language == 'en' ? 1 : -1}]};
};

export const rowReverseRTL = (language: string) => {
  return {
    flexDirection: language === 'ar' ? 'row-reverse' : 'row',
  };
};
export const alignItemsRTL = (language: string) => {
  return {
    alignItems: language === 'ar' ? 'flex-start' : 'flex-end',
  };
};

export const alignSelfRTL = (language: string) => {
  return {
    alignSelf: language === 'ar' ? 'flex-start' : 'flex-end',
  };
};

export const alignItemsFlexRTL = (language: string) => {
  return {
    alignItems: language === 'ar' ? 'flex-end' : 'flex-start',
  };
};

export const marginRTLRight = (language: string, number: any) => {
  return {
    marginRight: language == 'ar' ? 0 : number,
    marginLeft: language == 'en' ? 0 : number,
  };
};

export const paddingRTLRight = (language: string, number: any) => {
  return {
    paddingRight: language == 'ar' ? 0 : number,
    paddingLeft: language == 'en' ? 0 : number,
  };
};

export const marginRTLLeft = (language: string, number: any) => {
  return {
    marginLeft: language == 'ar' ? 0 : number,
    marginRight: language == 'en' ? 0 : number,
  };
};

export const paddingRTLLeft = (language: string, number: any) => {
  return {
    paddingLeft: language == 'ar' ? 0 : number,
    paddingRight: language == 'en' ? 0 : number,
  };
};

const Theme = {
  textRTL,
  alignSelfRTL,
  rowReverseRTL,
  marginRTLLeft,
  paddingRTLLeft,
  alignItemsRTL,
  alignItemsFlexRTL,
  paddingRTLRight,
  marginRTLRight,
};

export default Theme;

const ctrlWrapper = ctrl => {
    const func = async (rq, rs, next) => {
      try {
        await ctrl(rq, rs, next);
      } 
      catch (error) {
        next(error);
      }
    }
    
    return func;
  }
  
  module.exports = ctrlWrapper;
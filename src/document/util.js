//*****************************************************************************
//*****************************************************************************
//
// Different document utilities
//
//*****************************************************************************
//*****************************************************************************

module.exports = {getsuffix}

//-----------------------------------------------------------------------------
// Determine file type
//-----------------------------------------------------------------------------

function getsuffix(f, suffixes = [".mawe", ".mawe.gz", ".moe"]) {
  const suffix = suffixes.find(suffix => f.name.endsWith(suffix))
  f.format = {
    ".mawe": "mawe",
    ".mawe.gz": "mawe",
    ".moe": "moe",
  }[suffix]
  return suffix;
}
    
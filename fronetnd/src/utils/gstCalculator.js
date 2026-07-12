// India Pincode to State mapping
// Based on first 3 digits of pincode (postal code)
const pinCodeToState = [
  { min: 100001, max: 199999, state: 'Delhi' },
  { min: 110001, max: 110099, state: 'Delhi' },
  { min: 120001, max: 149999, state: 'Haryana' },
  { min: 150001, max: 159999, state: 'Punjab' },
  { min: 160001, max: 169999, state: 'Chandigarh' },
  { min: 170001, max: 179999, state: 'Himachal Pradesh' },
  { min: 180001, max: 189999, state: 'Jammu & Kashmir' },
  { min: 190001, max: 199999, state: 'Jammu & Kashmir' },
  { min: 200001, max: 219999, state: 'Uttar Pradesh' },
  { min: 220001, max: 229999, state: 'Uttar Pradesh' },
  { min: 230001, max: 239999, state: 'Uttar Pradesh' },
  { min: 240001, max: 249999, state: 'Uttar Pradesh' },
  { min: 250001, max: 259999, state: 'Uttar Pradesh' },
  { min: 260001, max: 269999, state: 'Uttarakhand' },
  { min: 270001, max: 279999, state: 'Uttar Pradesh' },
  { min: 280001, max: 289999, state: 'Uttar Pradesh' },
  { min: 290001, max: 299999, state: 'Uttarakhand' },
  { min: 301001, max: 309999, state: 'Rajasthan' },
  { min: 310001, max: 319999, state: 'Rajasthan' },
  { min: 320001, max: 329999, state: 'Rajasthan' },
  { min: 330001, max: 339999, state: 'Rajasthan' },
  { min: 340001, max: 349999, state: 'Rajasthan' },
  { min: 350001, max: 359999, state: 'Gujarat' },
  { min: 360001, max: 369999, state: 'Gujarat' },
  { min: 370001, max: 379999, state: 'Gujarat' },
  { min: 380001, max: 389999, state: 'Gujarat' },
  { min: 390001, max: 399999, state: 'Gujarat' },
  { min: 400001, max: 409999, state: 'Maharashtra' },
  { min: 410001, max: 419999, state: 'Maharashtra' },
  { min: 420001, max: 429999, state: 'Maharashtra' },
  { min: 430001, max: 439999, state: 'Maharashtra' },
  { min: 440001, max: 449999, state: 'Maharashtra' },
  { min: 450001, max: 459999, state: 'Madhya Pradesh' },
  { min: 460001, max: 469999, state: 'Madhya Pradesh' },
  { min: 470001, max: 479999, state: 'Madhya Pradesh' },
  { min: 480001, max: 489999, state: 'Madhya Pradesh' },
  { min: 490001, max: 499999, state: 'Chhattisgarh' },
  { min: 500001, max: 509999, state: 'Telangana' },
  { min: 510001, max: 519999, state: 'Telangana' },
  { min: 520001, max: 529999, state: 'Andhra Pradesh' },
  { min: 530001, max: 539999, state: 'Andhra Pradesh' },
  { min: 560001, max: 569999, state: 'Karnataka' },
  { min: 570001, max: 579999, state: 'Karnataka' },
  { min: 580001, max: 589999, state: 'Karnataka' },
  { min: 590001, max: 599999, state: 'Karnataka' },
  { min: 600001, max: 609999, state: 'Tamil Nadu' },
  { min: 610001, max: 619999, state: 'Tamil Nadu' },
  { min: 620001, max: 629999, state: 'Tamil Nadu' },
  { min: 630001, max: 639999, state: 'Tamil Nadu' },
  { min: 640001, max: 649999, state: 'Tamil Nadu' },
  { min: 670001, max: 679999, state: 'Kerala' },
  { min: 680001, max: 689999, state: 'Kerala' },
  { min: 690001, max: 699999, state: 'Kerala' },
  { min: 700001, max: 709999, state: 'West Bengal' },
  { min: 710001, max: 719999, state: 'West Bengal' },
  { min: 720001, max: 729999, state: 'West Bengal' },
  { min: 730001, max: 739999, state: 'West Bengal' },
  { min: 740001, max: 749999, state: 'West Bengal' },
  { min: 750001, max: 759999, state: 'Odisha' },
  { min: 760001, max: 769999, state: 'Odisha' },
  { min: 770001, max: 779999, state: 'Odisha' },
  { min: 780001, max: 789999, state: 'Assam' },
  { min: 790001, max: 799999, state: 'Meghalaya' },
  { min: 793001, max: 793999, state: 'Meghalaya' },
  { min: 794001, max: 794999, state: 'Meghalaya' },
  { min: 795001, max: 795999, state: 'Manipur' },
  { min: 796001, max: 796999, state: 'Mizoram' },
  { min: 797001, max: 798999, state: 'Nagaland' },
  { min: 799001, max: 799999, state: 'Tripura' },
  { min: 800001, max: 809999, state: 'Bihar' },
  { min: 810001, max: 819999, state: 'Bihar' },
  { min: 820001, max: 829999, state: 'Bihar' },
  { min: 830001, max: 839999, state: 'Jharkhand' },
  { min: 840001, max: 849999, state: 'Bihar' },
  { min: 850001, max: 859999, state: 'Jharkhand' },
  { min: 860001, max: 869999, state: 'Jharkhand' },
  { min: 870001, max: 879999, state: 'Jharkhand' },
  { min: 880001, max: 899999, state: 'Uttar Pradesh' },
  { min: 900001, max: 939999, state: 'Uttar Pradesh' },
  { min: 941001, max: 949999, state: 'Rajasthan' },
  { min: 950001, max: 969999, state: 'Manipur' },
  { min: 970001, max: 979999, state: 'Tripura' },
  { min: 980001, max: 989999, state: 'Nagaland' },
  { min: 990001, max: 999999, state: 'Lakshadweep' },
];

// Special states/UTs with limited pincodes
const specialPincodes = [
  { min: 744101, max: 744399, state: 'Andaman & Nicobar' },
  { min: 403001, max: 403999, state: 'Goa' },
  { min: 605001, max: 605199, state: 'Puducherry' },
  { min: 609001, max: 609999, state: 'Puducherry' },
  { min: 673001, max: 673999, state: 'Kerala' }, // Calicut
  { min: 682001, max: 682999, state: 'Kerala' }, // Kochi
  { min: 695001, max: 695999, state: 'Kerala' }, // Trivandrum
  { min: 396001, max: 396999, state: 'Dadra & Nagar Haveli' },
  { min: 362001, max: 362999, state: 'Diu' },
  { min: 382001, max: 382999, state: 'Daman' },
];

const allPincodeMappings = [...pinCodeToState, ...specialPincodes];

// Business is registered in Maharashtra (Mumbai)
const BUSINESS_STATE = 'Maharashtra';

// State delivery charge tiers (in ₹)
const deliveryCharges = {
  'Maharashtra': 40,
  'Gujarat': 60,
  'Madhya Pradesh': 70,
  'Goa': 60,
  'Dadra & Nagar Haveli': 60,
  'Daman': 60,
  'Diu': 60,
  'Rajasthan': 80,
  'Delhi': 80,
  'Haryana': 80,
  'Uttar Pradesh': 80,
  'Uttarakhand': 85,
  'Punjab': 90,
  'Chandigarh': 90,
  'Himachal Pradesh': 95,
  'Jammu & Kashmir': 100,
  'Karnataka': 80,
  'Telangana': 80,
  'Andhra Pradesh': 85,
  'Tamil Nadu': 90,
  'Kerala': 90,
  'Puducherry': 90,
  'Lakshadweep': 120,
  'Goa': 60,
  'Chhattisgarh': 80,
  'Odisha': 85,
  'West Bengal': 85,
  'Jharkhand': 85,
  'Bihar': 90,
  'Assam': 120,
  'Meghalaya': 120,
  'Nagaland': 130,
  'Manipur': 130,
  'Mizoram': 130,
  'Tripura': 130,
  'Arunachal Pradesh': 140,
  'Sikkim': 120,
  'Andaman & Nicobar': 150,
};

// Default delivery charge for unmapped states
const DEFAULT_DELIVERY_CHARGE = 100;

/**
 * Get state name from Indian pincode
 * @param {string|number} pincode - 6-digit pincode
 * @returns {string|null} State name or null if invalid
 */
export const getStateFromPincode = (pincode) => {
  if (!pincode) return null;
  
  const pin = parseInt(pincode.toString().replace(/\D/g, ''), 10);
  if (isNaN(pin) || pin.toString().length !== 6) return null;

  for (const mapping of allPincodeMappings) {
    if (pin >= mapping.min && pin <= mapping.max) {
      return mapping.state;
    }
  }
  return null;
};

/**
 * Get GST details based on delivery state
 * @param {string} deliveryState - The state where items will be delivered
 * @returns {Object} GST breakdown
 */
export const getGST = (deliveryState) => {
  if (!deliveryState) {
    return { cgst: 0, sgst: 0, igst: 0, totalRate: 0, type: 'none' };
  }

  if (deliveryState === BUSINESS_STATE) {
    // Intra-state: CGST 9% + SGST 9% = 18%
    return {
      cgst: 9,
      sgst: 9,
      igst: 0,
      totalRate: 18,
      type: 'intra-state'
    };
  } else {
    // Inter-state: IGST 18%
    return {
      cgst: 0,
      sgst: 0,
      igst: 18,
      totalRate: 18,
      type: 'inter-state'
    };
  }
};

/**
 * Get delivery charge for a state
 * @param {string} state - Delivery state
 * @returns {number} Delivery charge in ₹
 */
export const getDeliveryCharge = (state) => {
  if (!state) return 0;
  return deliveryCharges[state] || DEFAULT_DELIVERY_CHARGE;
};

/**
 * Calculate complete price breakdown
 * @param {number} subtotal - Cart subtotal
 * @param {string} deliveryState - Delivery state
 * @returns {Object} Complete price breakdown
 */
export const calculatePriceBreakdown = (subtotal, deliveryState) => {
  const gst = getGST(deliveryState);
  const deliveryCharge = getDeliveryCharge(deliveryState);
  
  const gstAmount = subtotal * (gst.totalRate / 100);
  const total = subtotal + gstAmount + deliveryCharge;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    gst: {
      ...gst,
      amount: Math.round(gstAmount * 100) / 100,
    },
    deliveryCharge,
    total: Math.round(total * 100) / 100,
  };
};

/**
 * List of all Indian states for dropdown/autocomplete
 */
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal',
  // Union Territories
  'Andaman & Nicobar', 'Chandigarh', 'Dadra & Nagar Haveli', 'Daman & Diu',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];
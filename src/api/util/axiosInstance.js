import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_PATH = import.meta.env.VITE_API_PATH;

// 创建axios实例
const instance = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API类型常量
const API_TYPE = {
  ADMIN: 'admin',
  USER: 'user',
};

// 通用錯誤處理
const handleError = (error) => {
  if (error.response) {
    const message = error.response.data?.message || '伺服器錯誤';
    console.error('Server Error:', message);
    return { error: true, message };
  } else {
    console.error('Network Error:', error.message);
    return { error: true, message: error.message || '發生未知錯誤' };
  }
};

// 动态URL生成函数
const generateUrl = (url, type = API_TYPE.USER) => {
  if (type === API_TYPE.ADMIN) {
    return `/${VITE_API_PATH}/admin/${url}`;
  }
  return `/${VITE_API_PATH}/user/${url}`;
};

// get方法
export const $get = async (url, type = API_TYPE.USER) => {
  const reqUrl = generateUrl(url, type);
  // console.log(reqUrl);  // 這裡是正確的地方，打印生成的 URL
  try {
    const response = await instance.get(reqUrl);
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};


// // post方法
export const $post = async (url, params, type = API_TYPE.USER, config = {}) => {
  const reqUrl = generateUrl(url, type);

  const finalConfig = {
    headers: {
      'Content-Type': 'application/json',
      ...(config.headers || {})
    },
    ...config
  };

  try {
    const response = await instance.post(reqUrl, params, finalConfig);
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// // put方法
// export const $put = async (url, params, type = API_TYPE.USER) => {
//   const reqUrl = generateUrl(url, type);
//   try {
//     const { data } = await instance.put(reqUrl, params);
//     return data;
//   } catch (error) {
//     console.error('Error in PUT request:', error);
//     return error;
//   }
// };

// // delete方法
// export const $delete = async (url, params, type = API_TYPE.USER) => {
//   const reqUrl = generateUrl(url, type);
//   try {
//     const { data } = await instance.delete(reqUrl, { params });
//     return data;
//   } catch (error) {
//     console.error('Error in DELETE request:', error);
//     return error;
//   }
// };

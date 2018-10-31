package com.bulu.cn.xutils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.xutils.http.app.ResponseParser;
import org.xutils.http.request.UriRequest;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @Auther: YJH
 * @Package: BuluApp-com.bulu.cn.xutils
 * @Created time: 2018/10/30-10:56
 * @description: 描述..
 */

public class JsonResponseParser implements ResponseParser {
    // 如果实现 InputStreamResponseParser, 可实现自定义流数据转换.

    @Override
    public void checkResponse(UriRequest request) throws Throwable {
        // custom check ?
        // get headers ?
    }

    /**
     * 转换result为resultType类型的对象
     *
     * @param resultType  返回值类型(可能带有泛型信息)
     * @param resultClass 返回值类型
     * @param result      字符串数据
     * @return
     * @throws Throwable
     */
    @Override
    public Object parse(Type resultType, Class<?> resultClass, String result) throws Throwable {
        if (resultClass == List.class) {

        }
        // 这里只是个示例, 不做json转换.
        List<AvatarResponse> list = new ArrayList<AvatarResponse>();
        AvatarResponse response = new AvatarResponse();
        response.setData(result);
        list.add(response);

        Map<String, String> retMap = new Gson().fromJson(result,
                new TypeToken<Map<String, String>>(){}.getType());

        return list;
        // fastJson 解析:
        // return JSON.parseArray(result, (Class<?>) ParameterizedTypeUtil.getParameterizedType(resultType, List.class, 0));

    }
}

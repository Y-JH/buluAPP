package com.bulu.cn.xutils;

import org.xutils.http.RequestParams;
import org.xutils.http.annotation.HttpRequest;
import org.xutils.http.app.DefaultParamsBuilder;

/**
 * @Auther: YJH
 * @Package: BuluApp-com.bulu.cn.xutils
 * @Created time: 2018/10/30-10:37
 * @description: 描述..
 */

@HttpRequest(
        host = "http://192.168.0.132:8080/",
        path = "mine/UploadUserImg",
        builder = DefaultParamsBuilder.class/*可选参数, 控制参数构建过程, 定义参数签名, SSL证书等*/)
public class AvatarParams extends RequestParams {

    public AvatarParams() {
        this.setMultipart(true); // 使用multipart表单
        this.setAsJsonContent(true); // 请求body将参数转换为json形式发送
    }

}

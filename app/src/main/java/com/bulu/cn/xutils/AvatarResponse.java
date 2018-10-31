package com.bulu.cn.xutils;

import org.xutils.http.annotation.HttpResponse;

/**
 * @Auther: YJH
 * @Package: BuluApp-com.bulu.cn.xutils
 * @Created time: 2018/10/30-10:54
 * @description: 描述..
 */

@HttpResponse(parser = JsonResponseParser.class)
public class AvatarResponse {


    /**
     * code : 10000
     * msg : 上传成功
     * data : oss-cn-beijing.aliyuncs.com/2018-10-30/cada766466db4faab49ea120e7729727-app-screen.jpg
     */

    private int code;
    private String msg;
    private String data;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "AvatarResponse{" +
                "code=" + code +
                ", msg='" + msg + '\'' +
                ", data='" + data + '\'' +
                '}';
    }
}

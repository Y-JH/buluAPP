package com.bulu.cn.xutils;

import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.orhanobut.logger.Logger;

import org.xutils.common.Callback;
import org.xutils.ex.HttpException;
import org.xutils.x;

import java.io.File;

/**
 * @Auther: YJH
 * @Package: BuluApp-com.bulu.cn.xutils
 * @Created time: 2018/10/30-10:27
 * @description: 描述..
 */

public class XUtils3 {
    private AvatarParams params = null;

    private XUtils3(){
        this(new Builder());
    }

    private XUtils3(Builder builder){
        params = builder.params;
    }


    public Builder newBuilder(){
        return new Builder();
    }
    public static final class Builder {
        AvatarParams params = null;
        public Builder(){
            params = new AvatarParams();
        }

        /**
         * 头像地址
         * @param fUrl
         * @return
         */
        public Builder addBodyFileParameter(String fUrl){
            params.addBodyParameter("userimg", new File(fUrl));
            return this;
        }

        /**
         * 个人id
         * @param uId
         * @return
         */
        public Builder addBodyStrParameter(String uId){
            params.addBodyParameter("cid", String.valueOf(uId));
            return this;
        }

        public XUtils3 build(){
            return new XUtils3(this);
        }
    }

    /**
     * 上传头像文件
     * @param callBack
     */
    public void uploadAvatar(final ICommonUploadFileListener<AvatarResponse> callBack) {
        x.http().post(params, new Callback.CommonCallback<String>() {
            @Override
            public void onSuccess(String result) {
                Toast.makeText(x.app(), "success", Toast.LENGTH_LONG).show();
                AvatarResponse response = new Gson().fromJson(result,
                        new TypeToken<AvatarResponse>(){}.getType());
                Logger.d("XUtils3","SUCCESS=====>>>"+response);
                callBack.onSuccess(response);
            }

            @Override
            public void onError(Throwable ex, boolean isOnCallback) {
                Toast.makeText(x.app(), ex.getMessage(), Toast.LENGTH_LONG).show();
                if (ex instanceof HttpException) { // 网络错误
                    HttpException httpEx = (HttpException) ex;
                    int responseCode = httpEx.getCode();
                    String responseMsg = httpEx.getMessage();
                    String errorResult = httpEx.getResult();
                    // ...
                } else { // 其他错误
                    // ...
                }
                Logger.d("XUtils3","ERROR=====>>>"+ex);
            }

            @Override
            public void onCancelled(CancelledException cex) {

            }

            @Override
            public void onFinished() {

            }
        });

        // cancelable.cancel(); // 取消请求
    }
}

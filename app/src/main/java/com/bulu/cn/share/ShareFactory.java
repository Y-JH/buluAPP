package com.bulu.cn.share;

import android.content.Context;

import com.mob.MobSDK;

import cn.sharesdk.framework.Platform;
import cn.sharesdk.framework.PlatformActionListener;
import cn.sharesdk.framework.ShareSDK;
import cn.sharesdk.sina.weibo.SinaWeibo;
import cn.sharesdk.tencent.qq.QQ;
import cn.sharesdk.tencent.qzone.QZone;
import cn.sharesdk.wechat.friends.Wechat;
import cn.sharesdk.wechat.moments.WechatMoments;



/**
 * @Title:ShareFactory
 * @Package:com.youdu.share
 * @Description: 分享的控制管理类:分享功能的统一入口
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/8/1315:12
 */
public class ShareFactory {

    private static final String APP_KEY = "275fb9e01e945";
    private static final String APP_SECRET = "f7d6791ae5c1539a392dfe8d5094721d";
    private Platform curPlatForm;//当前的平台类型
    private volatile static ShareFactory mInstance;

    private ShareFactory() {
    }

    public static ShareFactory getInstance() {
        if (null == mInstance) {
            synchronized (ShareFactory.class) {
                if (null == mInstance) {
                    mInstance = new ShareFactory();
                }
            }
        }

        return mInstance;
    }

    /**
     *
     * 功能：在Application中调用
     * 填写您从Mob开发者后台中得到的Appkey和AppSecret
     *
     */
    public static void initMobSDK(Context mApplication){
        MobSDK.init(mApplication, APP_KEY, APP_SECRET);
    }

    /**
     * 功能：根据传入的不同平台，进行分享
     * @param shareData
     * @param listener
     */
    public void shareFor(ShareData shareData, PlatformActionListener listener) {
        switch (shareData.platForm) {
            case QQ:
                curPlatForm = ShareSDK.getPlatform(QQ.NAME);
                break;

            case QQqzone:
                curPlatForm = ShareSDK.getPlatform(QZone.NAME);
                break;

            case WeChat:
                curPlatForm = ShareSDK.getPlatform(Wechat.NAME);
                break;

            case WechatMoment:
                curPlatForm = ShareSDK.getPlatform(WechatMoments.NAME);
                break;

            case SinaWeibo:
                curPlatForm = ShareSDK.getPlatform(SinaWeibo.NAME);
                break;
        }

        curPlatForm.setPlatformActionListener(listener);
        curPlatForm.share(shareData.shareParams);
    }
}

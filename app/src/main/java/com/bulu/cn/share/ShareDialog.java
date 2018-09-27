package com.bulu.cn.share;

import android.app.Activity;
import android.content.Context;
import android.content.res.Resources;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.View;

import com.bulu.cn.R;
import com.flyco.animation.FadeEnter.FadeEnter;
import com.flyco.animation.FadeExit.FadeExit;
import com.flyco.dialog.widget.popup.base.BasePopup;

import java.util.HashMap;

import cn.sharesdk.framework.Platform;
import cn.sharesdk.framework.PlatformActionListener;


/**
 * @Title:ShareDialog
 * @Package:com.youdu.share
 * @Description: 因为不同的平台分享的时候，内容的要求不同，所以可参照Mob源码中进行内容的分享；
 *                  https://github.com/MobClub/ShareSDK-for-Android/blob/master/SampleFresh/app/src/main/java/cn/sharesdk/demo/platform/wechat/friends/WechatShare.java
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/8/1316:29
 */
public class ShareDialog extends BasePopup<ShareDialog> implements View.OnClickListener{

    private int    mShareType;
    private String mShareTitle;
    private String mShareText;
    private String mSharePhoto;
    private String mShareTitleUrl;
    private String mShareSite;
    private String mShareSiteUrl;
    private String mUrl;


    public static final int SHARE_IMAGE = Platform.SHARE_IMAGE;


    public ShareDialog(Context context) {
        this(context, new Builder());
    }

    private ShareDialog(Context context, Builder builder){
        super(context);
        setCanceledOnTouchOutside(true);
        mShareType = builder.mShareType;
        mShareTitle = builder.mShareTitle;
        mShareText = builder.mSharePhoto;
        mSharePhoto = builder.mSharePhoto;
        mShareTitleUrl = builder.mShareTitleUrl;
        mShareSite = builder.mShareSite;
        mShareSiteUrl = builder.mShareSiteUrl;
        mUrl = builder.mUrl;
    }

    @Override
    public View onCreatePopupView() {
        View inflate = View.inflate(mContext, R.layout.share_platform_layout, null);
        return inflate;
    }

    @Override
    public void setUiBeforShow() {
        findViewById(R.id.li_pengyouquan).setOnClickListener(this);
        findViewById(R.id.li_haoyou).setOnClickListener(this);
        findViewById(R.id.li_shoujiQQ).setOnClickListener(this);
        findViewById(R.id.li_qqKongjian).setOnClickListener(this);
        findViewById(R.id.li_xinlangWeibo).setOnClickListener(this);

        setDialogProties();
    }

    /**
     * 功能：绕过构建者模式，在类中设置对话框的弹出属性
     */
    private void setDialogProties(){

        Resources resources = mContext.getResources();
        DisplayMetrics dm = resources.getDisplayMetrics();
        location(dm.widthPixels / 2, dm.heightPixels);
        dimEnabled(true);
        showAnim(new FadeEnter().duration(200));
        dismissAnim(new FadeExit().duration(200));
    }


    private void shareFor(SharePlatForm platForm) {
        ShareData shareData = new ShareData();
        Platform.ShareParams shareParams = new Platform.ShareParams();
        shareParams.setShareType(mShareType);
        shareParams.setTitle(mShareTitle);
        shareParams.setText(mShareText);
        shareParams.setImageUrl(mSharePhoto);
        shareParams.setTitleUrl(mShareTitleUrl);
        shareParams.setSite(mShareSite);
        shareParams.setSiteUrl(mShareSiteUrl);
        shareParams.setUrl(mUrl);

        shareData.shareParams = shareParams;
        shareData.platForm = platForm;

        ShareFactory.getInstance().shareFor(shareData, listener);

    }


    public PlatformActionListener listener = new PlatformActionListener() {
        public String TAG = "PlatformActionListener";

        @Override
        public void onComplete(Platform platform, int i, HashMap<String, Object> hashMap) {

        }

        @Override
        public void onError(Platform platform, int i, Throwable throwable) {
            Log.e(TAG,"PlatformActionListener-on-Error=>>>"+throwable);
        }

        @Override
        public void onCancel(Platform platform, int i) {

        }
    };


    @Override
    public void onClick(View view) {
        int i = view.getId();
        if (i == R.id.li_pengyouquan) {
            shareFor(SharePlatForm.WechatMoment);

        } else if (i == R.id.li_haoyou) {
            shareFor(SharePlatForm.WeChat);

        } else if (i == R.id.li_shoujiQQ) {
            shareFor(SharePlatForm.QQ);

        } else if (i == R.id.li_qqKongjian) {
            shareFor(SharePlatForm.QQqzone);

        } else if (i == R.id.li_xinlangWeibo) {
            shareFor(SharePlatForm.SinaWeibo);

        }
        dismiss();
    }

    public static class Builder {
        private int mShareType;
        private String mShareTitle;
        private String mShareText;
        private String mSharePhoto;
        private String mShareTitleUrl;
        private String mShareSite;
        private String mShareSiteUrl;
        private String mUrl;

        public Builder setmShareType(int mShareType) {
            this.mShareType = mShareType;

            return this;
        }


        public Builder setmShareTitle(String mShareTitle) {
            this.mShareTitle = mShareTitle;

            return this;
        }


        public Builder setmShareText(String mShareText) {
            this.mShareText = mShareText;

            return this;
        }


        public Builder setmSharePhoto(String mSharePhoto) {
            this.mSharePhoto = mSharePhoto;

            return this;
        }


        public Builder setmShareTitleUrl(String mShareTitleUrl) {
            this.mShareTitleUrl = mShareTitleUrl;

            return this;
        }


        public Builder setmShareSite(String mShareSite) {
            this.mShareSite = mShareSite;

            return this;
        }


        public Builder setmShareSiteUrl(String mShareSiteUrl) {
            this.mShareSiteUrl = mShareSiteUrl;

            return this;
        }


        public Builder setmUrl(String mUrl) {
            this.mUrl = mUrl;

            return this;
        }

        public ShareDialog build(Activity context){
            return new ShareDialog(context, this);
        }
    }
}

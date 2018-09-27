package com.bulu.cn;

import android.app.Application;
import android.content.Context;

import com.orhanobut.logger.LogLevel;
import com.orhanobut.logger.Logger;

import me.yokeyword.fragmentation.Fragmentation;
import me.yokeyword.fragmentation.helper.ExceptionHandler;


/**
 * <p>这里仅需做一些初始化的工作</p>
 *
 * @author 张华洋 2017/2/15 20:14
 * @version V1.2.0
 * @name BaseApplication
 */
public class BaseApplication extends Application {

    private static final String TAG = "BaseApplication";
    public static final String ROOT_PACKAGE = "com.buluedu";
    private static BaseApplication sInstance;

    public static BaseApplication getsInstance() {
        return sInstance;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        sInstance = this;

        initLogger();
        initFragmentation();
    }


    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        // dex突破65535的限制
//        MultiDex.install(this);
    }

    /**
     *
     *  功能：初始化路由Fragmentation
     *  @Link:https://github.com/YoKeyword/Fragmentation
     */
    private void initFragmentation(){
        Fragmentation.builder()
                // 设置 栈视图 模式为 （默认）悬浮球模式
                // SHAKE: 摇一摇唤出
                // NONE：隐藏， 仅在Debug环境生效
                .stackViewMode(Fragmentation.NONE)
                .debug(true) // 实际场景建议.debug(BuildConfig.DEBUG)
                /**
                 * 可以获取到{@link me.yokeyword.fragmentation.exception.AfterSaveStateTransactionWarning}
                 * 在遇到After onSaveInstanceState时，不会抛出异常，会回调到下面的ExceptionHandler
                 */
                .handleException(new ExceptionHandler() {
                    @Override
                    public void onException(Exception e) {
                        // 以Bugtags为例子: 把捕获到的 Exception 传到 Bugtags 后台。
                        // Bugtags.sendException(e);
                    }
                })
                .install();
    }

    /**
     * 功能：初始化Logger
     */
    private void initLogger() {
        Logger.init(ROOT_PACKAGE)
                .hideThreadInfo()
                .methodCount(3)
                .logLevel(LogLevel.FULL);
    }
}

package com.bulu.cn;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.bulu.cn.base.BaseActivity;


public class MainActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        findViewById(R.id.btn_click).setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                startActivity(new Intent(MainActivity.this, MainHomeActivity.class));
//            }
//        });
//
//
//        final String photo ="http://img.mukewang.com/5465af0c0001bb6706000338-590-330.jpg";
//        findViewById(R.id.btn_click2).setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                new ShareDialog.Builder()
//                        .setmShareType(SHARE_IMAGE)
//                        .setmShareText("百万大奖等你拿")
//                        .setmSharePhoto(photo)
//                        .build(MainActivity.this).show();
//            }
//        });


//        if(!hasThePermisson(Manifest.permission.ACCESS_COARSE_LOCATION)){
//            requestPermission(EXTENT_PERMISSION_CODE_WRITE, Manifest.permission.ACCESS_COARSE_LOCATION);
//        }
//
//        if(!hasThePermisson(Manifest.permission.CAMERA)){
//            requestPermission(EXTENT_PERMISSION_CODE_CAMERA, Manifest.permission.CAMERA);
//        }

        startActivity(new Intent(this, HomeActivity.class));

    }


    @Override
    public void doPermissionWriteGranted() {
        super.doPermissionWriteGranted();
        Log.e("permission","-----------doPermissionWriteGranted-----------");
    }

    @Override
    public void doPermissionWriteDenied() {
        super.doPermissionWriteDenied();
        Log.e("permission","-----------doPermissionWriteDenied-----------");
    }

    @Override
    public void doPermissionCameraDenied() {
        super.doPermissionCameraDenied();
        Log.e("permission","-----------doPermissionCameraDenied-----------");
    }

    @Override
    public void doPermissionCameraGranted() {
        super.doPermissionCameraGranted();
        Log.e("permission","-----------doPermissionCameraGranted-----------");
    }
}

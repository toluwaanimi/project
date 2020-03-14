import 'package:flutter/material.dart';

class Login extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Note',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
          primarySwatch: Colors.deepOrange, cursorColor: Colors.deepOrange),
      home: LoginPage(),
    );
  }
}

class LoginPage extends StatefulWidget {
  LoginPage({Key key}) : super(key: key);

  _Page createState() => _Page();
}

class _Page extends State<LoginPage> {
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  Widget build(BuildContext context) {
    return Scaffold(
        body: Padding(
            padding: EdgeInsets.all(10),
            child: ListView(
              children: <Widget>[
                Container(
                    alignment: Alignment.center,
                    padding: EdgeInsets.all(10),
                    child: Text(
                      'Welcome Tobi',
                      style: TextStyle(
                          color: Colors.deepOrange,
                          fontWeight: FontWeight.w500,
                          fontSize: 30),
                    )),
                Container(
                    alignment: Alignment.center,
                    padding: EdgeInsets.all(10),
                    child: Text(
                      'Sign in',
                      style: TextStyle(fontSize: 20),
                    )),
                Center(
                  child: Container(
                    padding: EdgeInsets.fromLTRB(10, 10, 10, 0),
                    child: TextField(
                      obscureText: true,
                      controller: passwordController,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Password',
                      ),
                    ),
                  ),
                ),

                FlatButton(
                  onPressed: () {
                    //forgot password screen
                  },
                  textColor: Colors.deepOrange,
                  child: Text(''),
                ),
                Container(
                    height: 50,
                    padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
                    child: RaisedButton(
                      textColor: Colors.white,
                      color: Colors.deepOrange,
                      child: Text('Login'),
                      onPressed: () {
                        print(nameController.text);
                        print(passwordController.text);
                      },
                    )),
//                Container(
//                    child: Row(
//                  children: <Widget>[
//                    Text('Does not have account?'),
//                    FlatButton(
//                      textColor: Colors.deepOrange,
//                      child: Text(
//                        'Sign in',
//                        style: TextStyle(fontSize: 20),
//                      ),
//                      onPressed: () {
//                        //signup screen
//                      },
//                    )
//                  ],
//                  mainAxisAlignment: MainAxisAlignment.center,
//                ))
              ],
            )));
  }
}
